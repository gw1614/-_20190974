function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

// 카운트 값을 증가시키는 함수
function incrementCount(cookieName) {
    var count = getCookie(cookieName); // 기존 쿠키 값 얻기
    count = parseInt(count) || 0; // 정수로 변환, 기존 쿠키 값이 없으면 0으로 초기화
    count++; // 값 증가
    setCookie(cookieName, count, 1); // 업데이트된 카운트 값을 1일 동안 쿠키에 저장
}

function login_check(input, regex, message) 
{
    if (!regex.test(input.value))
	{
        alert(message);
        input.focus();
        return false;
    }
    return true;
}

function login(){
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
	let check = document.querySelector("#idSaveCheck");

    
    form.action = "../index_login.html";
    form.method = "get";
	
	if(check.checked == true) 
	{ // 아이디 체크 o
            alert("쿠키를 저장합니다.");
            setCookie("id", id.value, 1); // 1일 저장
            alert("쿠키 값 :" + id.value);
    } 
    else 
	{ // 아이디 체크 x
            setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
    }
	
	if (!login_check(id, /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/, "이메일 형식에 맞지 않습니다.")) //이메일 형식으로 작성
	{
        return;
    }
    if (!login_check(password, /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/, "비밀번호 형식에 맞지 않습니다.")) //대소문자,숫자,특수문자, 총 길이 10자 이상 작성
	{
        return;
    }
	
	
	//session_set(); // 세션 생성
    form.submit();
    
	
    if(id.value.length === 0 || password.value.length === 0){
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    }
	else
	{
		session_set(); // 세션 생성
		incrementCount('login_cnt'); // 로그인 횟수 증가
        form.submit();
    }
	
}

	function logout()
	{
		session_del(); // 세션 삭제
		incrementCount('logout_cnt'); // 로그아웃 횟수 증가

		location.href='../index.html';
	}






function get_id()
{  // 메시지 창을 출력하는 함수
	if(true)
	{
        decrypt_text();
    }
	
	else{
    var getParameters = function(paramName){ // 변수 = 함수(이름)
    var returnValue; // 리턴값을 위한 변수 선언
    var url = location.href; // 현재 접속 중인 주소 정보 저장
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
        for(var i = 0; i < parameters.length; i++) { 
		    var varName = parameters[i].split('=')[0];
            
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
		    }
	    } // 2중 for문 끝
	}; // 함수 끝
	alert(getParameters('id') + '님 방갑습니다!'); // 메시지 창 출력
	}
}


/*
if (id.value.length === 0 || password.value.length === 0) 
	{
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    } 
	else 
	{
        if (!login_check(id, /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/, "이메일 형식에 맞지 않습니다.")) 
		{
            return;
        }
        if (!login_check(password, /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/, "비밀번호 형식에 맞지 않습니다.")) 
		{
            return;
        }

        // 로그인 가능 횟수 체크
        var loginCount = getCookie("login_cnt") || 0;
        if (loginCount >= 3) 
		{
            alert("로그인 가능 횟수를 초과했습니다. 1분 동안 로그인 할 수 없습니다.");
            return;
        }

        session_set(); // 세션 생성
        incrementCount('login_cnt'); // 로그인 횟수 증가
        form.submit();
    }
}

function logout() 
{
    session_del(); // 세션 삭제
    incrementCount('logout_cnt'); // 로그아웃 횟수 증가
    location.href = '../index.html';
}
*/

/*
function get_id()
{  // 메시지 창을 출력하는 함수
	if(true)
	{
        decrypt_text();
    }
	
	else{
    var getParameters = function(paramName){ // 변수 = 함수(이름)
    var returnValue; // 리턴값을 위한 변수 선언
    var url = location.href; // 현재 접속 중인 주소 정보 저장
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
        for(var i = 0; i < parameters.length; i++) { 
		    var varName = parameters[i].split('=')[0];
            
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
		    }
	    } // 2중 for문 끝
	}; // 함수 끝
	alert(getParameters('id') + '님 방갑습니다!'); // 메시지 창 출력
	}
}
*/
	/*

// 로그인 횟수를 증가시키는 함수
function login_count() {
    incrementCount('login_cnt');
    alert("로그인 횟수: " + getCookie('login_cnt'));
}

// 로그아웃 횟수를 증가시키는 함수
function logout_count() {
    incrementCount('logout_cnt');
    alert("로그아웃 횟수: " + getCookie('logout_cnt'));
}

*/

/*

function deleteCookie(cookieName)
{
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
    
    if(get_id) { 
    id.value = get_id; 
    check.checked = true; 
    }
	session_check(); // 세션 유무 검사
}
function closePopup() {
        if (document.getElementById('check_popup').value) {
            setCookie("id", "N", 1);
            console.log("쿠키를 설정합니다.");
            self.close();
        }
    }
function setCookie(name, value, expiredays) 
{
        var date = new Date();
        date.setDate(date.getDate() + expiredays);
        //ocument.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString(); 
		document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "SameSite=None; Secure";
	
    }
function getCookie(name) 
{
        var cookie = document.cookie;
        console.log("쿠키를 요청합니다.");
        if (cookie != "") {
            var cookie_array = cookie.split("; ");
            for ( var index in cookie_array) {
                var cookie_name = cookie_array[index].split("=");
                
                if (cookie_name[0] == "id") {
                    return cookie_name[1];
                }
            }
        }
        return ;
}

function session_set() { //세션 저장
    let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword");

    if (sessionStorage) {
		let en_text = encrypt_text(password.value);

        sessionStorage.setItem("Session_Storage_test", en_text);

    } else {
        alert("로컬 스토리지 지원 x");
    }
}

function session_get() { //세션 읽기
    if (sessionStorage) {
       return sessionStorage.getItem("Session_Storage_test");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_test")) {
        alert("이미 로그인 되었습니다.");
        location.href='index_login.html'; // 로그인된 페이지로 이동
    }
}


function session_del() {//세션 삭제
    // Check if the sessionStorage object exists
    if (sessionStorage) {
        // Retrieve data
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
};

function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b); 
}
*/