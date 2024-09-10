document.addEventListener('DOMContentLoaded', function() {
    // 채팅방 목록 페이지에서 실시간 검색 기능 구현
    var searchQuery = document.getElementById('search-query');
    var chatroomListItems = document.querySelectorAll('#chatroom-list li');

    if (searchQuery) {
        searchQuery.addEventListener('input', function() {
            var query = searchQuery.value.toLowerCase();

            chatroomListItems.forEach(function(item) {
                var title = item.querySelector('a').textContent.toLowerCase();

                // 검색어가 일치하면 보이고, 그렇지 않으면 숨기기
                if (title.indexOf(query) !== -1 || query === '') {
                    item.style.display = ''; // 검색어 없으면 모두 표시
                } else {
                    item.style.display = 'none'; // 검색어 일치하지 않으면 숨기기
                }
            });
        });
    }

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
