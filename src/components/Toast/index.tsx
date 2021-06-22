import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
// import {
// 	FaInfo,
// 	FaCheck,
// 	FaExclamationTriangle,
// 	FaBug,
// 	FaExclamationCircle
// } from "react-icons/fa";

// export const displayIcon = (type: any) => {
// 	switch (type) {
// 		case "success":
// 			return <FaCheck />;
// 		case "info":
// 			return <FaInfo />;
// 		case "error":
// 			return <FaExclamationCircle />;
// 		case "warning":
// 			return <FaExclamationTriangle />;
// 		default:
// 			return <FaBug />;
// 	}
// };

interface T {
	type: keyof typeof notification;
	message: string;
}

interface notify {
	success: Function;
	info: Function;
	error: Function;
	warning: Function;
	dark: Function;
}

const notification: notify = toast;

const ToastMessage = ({ type, message }: T) => {
	const fn = notification[type];
	fn(
		<div style={{ display: "flex", color: "white" }}>
			{/* <div
				style={{
					fontSize: 15,
					paddingTop: 8,
					flexShrink: 0,
					textAlign: "center",
					width: "30px"
				}}
			>
				{displayIcon(type)}
			</div> */}
			<div style={{ flexGrow: 1, fontSize: 15 }}>
				{message}
			</div>
		</div>
	);
}

ToastMessage.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
