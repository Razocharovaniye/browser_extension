import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom";
import checkUrl from "./tools/url";
import checkSSL from "./tools/ssl";
import checkHref from "./tools/href";
import checkPerson from "./tools/person";
import sendFileTOSBX from "./tools/sandbox";

import "./tools/style/dist/style.css"


function App() {

	const inputRef = useRef(null)

	const inputSSL= useRef(null);
	const inputHTTPS= useRef(null);
	const inputPerson= useRef(null);
	const inputVT= useRef(null);
	const inputSBX= useRef(null);
	const inputPKM= useRef(null);


	useEffect(() => {
		// checkUrl(inputRef, inputHTTPS, inputVT); // - done
		// checkSSL(inputRef, inputSSL); //- do it output, done
		checkPerson(inputRef, inputPerson);

		// sendFileTOSBX(); //- done, but отправка по кнопке работает!!!!! УРА !!!!
		// checkHref(inputRef); //- done, but ниже по кнопке

		const checkHrefUrl = document.getElementById("check_url");
		checkHrefUrl.addEventListener("click", async function () {
			try {
				checkHref(inputRef, inputVT);
			} catch (error) {
				console.error(error);
			}
    	});

		const checkSbx = document.getElementById("send_File");
		checkSbx.addEventListener("click", async function () {
			try {
				sendFileTOSBX(inputSBX);
			} catch (error) {
				console.error(error);
			}
    	});	

		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			console.log(request.message); 
			inputPKM.current.value = request.message;
		});
				

	}, [])
	
	return (
		<div>
			<span className="header_menu">
				<h1>Go to Check this</h1>
				{/* <button id="popup_close">close</button> */}
			</span>
			

			<input className="url_inp" ref={inputRef} value="" />

			<span className="checks">
				<p className="checks_p">SSL/TLS certificate:</p>
				<textarea className="answer_inp" value="Waiting for the result" ref={inputSSL} />

				<p className="checks_p">This page is using:</p>
				<textarea className="answer_inp" value="Waiting for the result" ref={inputHTTPS}/>

				<p className="checks_p">Input request</p>
				<textarea className="answer_inp" value="Waiting for the result" ref={inputPerson} />

				<p className="checks_p">Check links:</p>
				<textarea className="answer_inp" value="Waiting for the result" ref={inputVT}/>

				<p className="checks_p">Check file:</p>
				<textarea className="answer_inp" value="Waiting for the result" ref={inputSBX}/>

				<p className="checks_p">Check Selected link:</p>
				<textarea className="answer_inp" value="Waiting for the result" ref={inputPKM}/>

			</span>

			<span className="btn_check">
				<button id="check_url" className="check_btn">Check Page Links</button>
				<button id="send_File" className="check_btn">Check File</button>
			</span>

		</div>
	);
}


const container = document.getElementById("react-target");
const root = createRoot(container);
root.render(<App />);
