document.addEventListener('DOMContentLoaded', function() {
    // 채팅방 목록 페이지에서 검색 기능 구현
    var searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var query = document.getElementById('search-query').value.toLowerCase();
            var chatroomListItems = document.querySelectorAll('#chatroom-list li');

            chatroomListItems.forEach(function(item) {
                var title = item.querySelector('a').textContent.toLowerCase();
                if (title.indexOf(query) !== -1) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
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
});
