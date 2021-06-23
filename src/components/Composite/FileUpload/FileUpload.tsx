import React from "react";

import './FileUpload.scss';
import TemplateInput, { PropsTemplateInput } from '@/components/Form/TemplateInput/TemplateInput';

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = (bytes: number) =>
	Math.round(bytes / KILO_BYTES_PER_BYTE);

interface FileUploadList {
	[key: string]: File
}

interface PropsFileUpload extends PropsTemplateInput {
	maxUpload: number;
	imageWidth: number;
	files: FileUploadList;
	maxFileSizeInBytes: number;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	onChange: (files: FileUploadList) => void;
}

interface StateFileUpload {
	listFiles: FileUploadList;
}

class FileUpload extends React.Component<PropsFileUpload, StateFileUpload>{

	static defaultProps = {
		maxUpload: 1,
		imageWidth: 200,
		maxFileSizeInBytes: DEFAULT_MAX_FILE_SIZE_IN_BYTES
	};

	constructor(props: PropsFileUpload) {
		super(props);

		this.state = {
			listFiles: this.props.files,
		}
	}

	static getDerivedStateFromProps(props: PropsFileUpload, state: StateFileUpload) {
		return props;
	}

	render() {
		let { listFiles } = this.state;

		const addNewFiles = (newFiles: FileList) => {
			for (let i = 0; i < newFiles.length; i++) {
				let file = newFiles[i];
				if (file.size < this.props.maxFileSizeInBytes) {
					if (Object.keys(listFiles).length < this.props.maxUpload) {
						listFiles[file.name] = file;
					}
				}
			}
			this.setState({
				listFiles: listFiles
			})
			this.props.onChange(listFiles);
		};

		return (
			<TemplateInput
				{...this.props}
			>
				<div className="file-upload">
					<section className="file-upload-cm">
						<button type="button">
							<i className="fa fa-file-o" />
							<span>Enviar arquivo</span>
							<span className="size">{Object.keys(listFiles).length || 0}/{this.props.maxUpload}</span>
						</button>
						<input
							{...this.props.inputProps}
							type="file"
							multiple={true}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const { files: newFiles } = e.target;
								if (newFiles && newFiles.length) {
									addNewFiles(newFiles);
								}
							}}
						/>
					</section>
					<section className="file-upload-preview">
						{Object.keys(listFiles).map((fileName, index) => {
							let file = listFiles[fileName];
							let isImageFile = file.type.split("/")[0] === "image";
							return (
								<div key={index} className="file-meta-data">
									{isImageFile && (
										<img
											src={URL.createObjectURL(file)}
											alt={`file preview ${index}`}
										/>
									)}
									<div className={'file-name ' + (isImageFile ? 'isImageFile' : '')}>
										<aside>
											<span>{file.name}</span>
											<span> - [{convertBytesToKB(file.size)} kb]</span>
										</aside>
										<i className="fa fa-times pointer" onClick={() => {
											delete listFiles[fileName];
											this.setState({
												listFiles: listFiles
											});
										}}/>
									</div>
								</div>
							);
						})}
					</section>
				</div>
			</TemplateInput>
		)
	}
}
export default FileUpload;
