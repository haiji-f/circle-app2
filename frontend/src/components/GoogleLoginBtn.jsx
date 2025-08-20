
import { GoogleLogin } from '@react-oauth/google'
import React from 'react'

export const GoogleLoginBtn = () => {
	return (
		<>
			<GoogleLogin
				onSuccess={(response) => {
					console.log(response);
                    //로그인 성공 시 response라는 이름으로 값이 돌아옴
				}}
				onError={() => {
					console.log("Login Failed");
                    //로그인 실패 시 Login Failed가 console로 출력
				}}
				width={"500px"}
				/>
		</>
	)
}

export default GoogleLoginBtn