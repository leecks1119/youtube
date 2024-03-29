/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

var interval; // interval 변수 선언
$('#progress').text('Progress: 0%');

$(document).ready(function() {
    $('#convert-form').submit(function(event) {
        event.preventDefault();  // 폼 기본 동작 방지

        var formData = new FormData(this);
        var linkInput = $('#link');
        if (linkInput.val() === '') {
            alert('유튜브 음원추출 할 주소를 입력해주세요!');
            return;
        }

        $.ajax({
            // url: 'http://127.0.0.1:5000/convert',
            url: 'https://8j5ngxuajc.execute-api.ap-northeast-2.amazonaws.com/production/convert',
            type: 'POST',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(event) {
                    if (event.lengthComputable) {
                        var percent = (event.loaded / event.total) * 100;
                        var currentProgress = 0;
                        var increment = 1;  // 2초에 1%씩 증가
                            interval = setInterval(function() {
                            if (currentProgress >= 99) {
                                clearInterval(interval);
                            } else {
                                currentProgress += increment;
                                $('#progress').text('Progress: ' + currentProgress.toFixed(1) + '%');
                            }
                        }, 250);  // 2초 간격으로 업데이트
                    }
                }, false);
                return xhr;
            },
            success: function(response) {
                if (response.download_link) {
                    clearInterval(interval);
                    $('#download-link').html('<a id="download-btn" href="' + response.download_link + '">음원 다운로드 받기</a>');
                    $('#download-link').show();
                    $('#progress').text('Progress: 100%');
                    alert('유튜브 음원추출이 완료되었습니다! 다운로드를 받으세요!')
                }
            },
            error: function(xhr, status, error) {
                clearInterval(interval);
                $('#progress').text('Progress: 0%');
                alert('유튜브 음원추출이 불가한 영상입니다.')
            }
        });
    });
});




var bottom_interval; // interval 변수 선언
$('#bottom_progress').text('Progress: 0%');

$(document).ready(function() {
    $('#bottom_convert-form').submit(function(event) {
        event.preventDefault();  // 폼 기본 동작 방지

        var formData = new FormData(this);
        var linkInput = $('#bottom_link');
        if (linkInput.val() === '') {
            alert('유튜브 음원추출 할 주소를 입력해주세요!');
            return;
        }

        $.ajax({
            // url: 'http://127.0.0.1:5000/convert',
            url: 'https://8j5ngxuajc.execute-api.ap-northeast-2.amazonaws.com/production/convert',
            type: 'POST',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(event) {
                    if (event.lengthComputable) {
                        var percent = (event.loaded / event.total) * 100;
                        var currentProgress = 0;
                        var increment = 1;  // 2초에 1%씩 증가
                        bottom_interval = setInterval(function() {
                            if (currentProgress >= 99) {
                                clearInterval(bottom_interval);
                            } else {
                                currentProgress += increment;
                                $('#bottom_progress').text('Progress: ' + currentProgress.toFixed(1) + '%');
                            }
                        }, 250);  // 2초 간격으로 업데이트
                    }
                }, false);
                return xhr;
            },
            success: function(response) {
                if (response.download_link) {
                    clearInterval(bottom_interval);
                    $('#bottom_download-link').html('<a id="download-btn" href="' + response.download_link + '">음원 다운로드 받기</a>');
                    $('#bottom_download-link').show();
                    $('#bottom_progress').text('Progress: 100%');
                    alert('유튜브 음원추출이 완료되었습니다! 다운로드를 받으세요!')
                }
            },
            error: function(xhr, status, error) {
                clearInterval(bottom_interval);
                $('#bottom_progress').text('Progress: 0%');
                alert('유튜브 음원추출이 불가한 영상입니다.')
            }
        });
    });
});


$(document).ready(function() {
    $('#subtitle-convert-form').submit(function(event) {
        event.preventDefault();  // 폼 기본 동작 방지

        var formData = new FormData(this);
        var linkInput = $('#link');
        if (linkInput.val() === '') {
            alert('유튜브 자막추출 할 주소를 입력해주세요!');
            return;
        }

        $.ajax({
            // url: 'http://127.0.0.1:5000/subtitle',
            url: 'https://8j5ngxuajc.execute-api.ap-northeast-2.amazonaws.com/production/subtitle',
            type: 'POST',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(event) {
                    if (event.lengthComputable) {
                        var percent = (event.loaded / event.total) * 100;
                        var currentProgress = 0;
                        var increment = 1;  // 2초에 1%씩 증가
                            interval = setInterval(function() {
                            if (currentProgress >= 99) {
                                clearInterval(interval);
                            } else {
                                currentProgress += increment;
                                $('#progress').text('Progress: ' + currentProgress.toFixed(1) + '%');
                            }
                        }, 250);  // 2초 간격으로 업데이트
                    }
                }, false);
                return xhr;
            },
            success: function(response) {
                if (response.subtitle_data) {
                    clearInterval(interval);
                    $('#progress').text('Progress: 100%');
                    $('#subtitle-area').text(response.subtitle_data);
                    alert('유튜브 자막추출이 완료되었습니다! 화면 아래를 확인해주세요.')
                }
            },
            error: function(xhr, status, error) {
                clearInterval(interval);
                $('#progress').text('Progress: 0%');
                alert('유튜브 자막추출이 불가한 영상입니다.')
            }
        });
    });
});

document.getElementById("copy-button").addEventListener("click", function() {
    // subtitle-area의 텍스트 내용을 가져옵니다.
    var subtitleText = document.getElementById("subtitle-area").textContent;

    // 텍스트를 클립보드에 복사합니다.
    navigator.clipboard.writeText(subtitleText)
        .then(function() {
            // 복사가 성공했을 때 실행할 코드
            alert("자막이 클립보드에 복사되었습니다!");
        })
        .catch(function(err) {
            // 복사가 실패했을 때 실행할 코드
            console.error("자막 복사 실패: ", err);
            alert("자막 복사에 실패했습니다.");
        });
});

