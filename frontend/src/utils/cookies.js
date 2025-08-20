/**
 * 쿠키를 설정하는 함수
 * @param {string} name - 쿠키 이름
 * @param {any} value - 저장할 값 (JSON으로 변환됨)
 * @param {number} days - 만료 기간 (일)
 */
export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    // 값을 JSON 문자열로 변환하여 저장
    document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
  }
  
  /**
   * 쿠키 값을 읽어오는 함수
   * @param {string} name - 쿠키 이름
   * @returns {any | null} - 저장된 값 (JSON 파싱됨) 또는 null
   */
  export function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        try {
          // JSON 문자열을 다시 객체/배열로 파싱
          return JSON.parse(c.substring(nameEQ.length, c.length));
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }
  