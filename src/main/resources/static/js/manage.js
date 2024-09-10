document.addEventListener('DOMContentLoaded', function() {
    var searchQuery = document.getElementById('search-query');
    var chatroomListItems = Array.from(document.querySelectorAll('#chatroom-list li'));
    var itemsPerPage = 10; // 한 페이지에 표시할 목록 개수
    var currentPage = 1;
    var totalPages;

    // 검색 기능
    if (searchQuery) {
        searchQuery.addEventListener('input', function() {
            var query = searchQuery.value.toLowerCase();
            var filteredItems = chatroomListItems.filter(function(item) {
                var title = item.querySelector('a').textContent.toLowerCase();
                return title.includes(query) || query === '';
            });

            renderPage(filteredItems);
            updatePagination(filteredItems);
        });
    }

    // 페이지네이션 업데이트 함수
    function updatePagination(items) {
        totalPages = Math.ceil(items.length / itemsPerPage);
        var pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        if (totalPages > 1) {
            var prevButton = document.createElement('button');
            prevButton.textContent = '이전';
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    renderPage(items);
                }
            });
            pagination.appendChild(prevButton);

            var pageInfo = document.createElement('span');
            pageInfo.textContent = currentPage + ' / ' + totalPages;
            pagination.appendChild(pageInfo);

            var nextButton = document.createElement('button');
            nextButton.textContent = '다음';
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderPage(items);
                }
            });
            pagination.appendChild(nextButton);
        }
    }

    // 페이지 렌더링 함수
    function renderPage(items) {
        var start = (currentPage - 1) * itemsPerPage;
        var end = start + itemsPerPage;

        chatroomListItems.forEach(function(item) {
            item.style.display = 'none'; // 모든 아이템 숨기기
        });

        items.slice(start, end).forEach(function(item) {
            item.style.display = ''; // 현재 페이지의 아이템만 표시
        });

        updatePagination(items);
    }

    // 초기 렌더링
    renderPage(chatroomListItems);

    // 채팅방 삭제 버튼 클릭 시 비밀번호 입력 폼 표시
    var showDeleteFormButton = document.getElementById('showDeleteFormButton');
    if (showDeleteFormButton) {
        showDeleteFormButton.addEventListener('click', function() {
            var deleteForm = document.getElementById('deleteForm');
            if (deleteForm) {
                deleteForm.style.display = 'block';
            }
            this.style.display = 'none'; // 삭제 버튼 숨김
        });
    }

    // 비밀번호 입력 폼 취소 버튼 클릭 시 폼 숨기기
    var cancelDelete = document.getElementById('cancelDelete');
    if (cancelDelete) {
        cancelDelete.addEventListener('click', function() {
            var deleteForm = document.getElementById('deleteForm');
            if (deleteForm) {
                deleteForm.style.display = 'none';
            }
            var showDeleteFormButton = document.getElementById('showDeleteFormButton');
            if (showDeleteFormButton) {
                showDeleteFormButton.style.display = 'block'; // 삭제 버튼 다시 표시
            }
        });
    }

    // 홈 버튼 클릭 시 홈 페이지로 이동
    var goHomeButton = document.getElementById('goHomeButton');
    if (goHomeButton) {
        goHomeButton.addEventListener('click', function() {
            window.location.href = '/chatroom/manage';
        });
    }

    // 채팅방 생성 버튼 클릭 시 채팅방 생성 페이지로 이동
    var createRoomBtn = document.getElementById('createRoomBtn');
    if (createRoomBtn) {
        createRoomBtn.addEventListener('click', function() {
            window.location.href = '/chatroom/create'; // 채팅방 생성 페이지로 이동
        });
    }

    // 비밀번호 입력 폼 제출 시 처리
    var deleteForm = document.getElementById('deleteForm');
    if (deleteForm) {
        deleteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var passwordInput = document.getElementById('deletePassword');
            var errorMessage = document.getElementById('errorMessage');

            // AJAX 요청을 통해 서버에서 비밀번호 검증
            var xhr = new XMLHttpRequest();
            xhr.open('POST', this.action, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // 비밀번호가 맞으면 페이지 리로드
                    window.location.href = '/chatroom/manage';
                } else {
                    // 비밀번호가 틀리면 오류 메시지 표시하고 입력 필드 비우기 및 포커스 이동
                    errorMessage.style.display = 'block';
                    passwordInput.value = ''; // 입력 필드 비우기
                    passwordInput.focus(); // 커서 포커스 이동
                }
            };
            xhr.send('password=' + encodeURIComponent(passwordInput.value));
        });
    }
});
