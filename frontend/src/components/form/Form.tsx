import Image from 'next/image';
import formStyle from './Form.module.css';
import { FILE_INPUT_ACCESS } from '@helpers/constants';
import { FaPlus, FaArrowRight, FaXmark } from 'react-icons/fa6';
import { ChangeEvent, useState } from 'react';
import formatFileSize from '@helpers/format-file-size';

interface FileItemProps extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number;
    fileName: string;
    fileSize: string;
    status: 'ready' | 'error';
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FileItem: React.FC<FileItemProps> = (props) => {
    const handleSetFile = () => {
        props.setFiles((prev) => {
            return prev.filter((_, index) => index !== props.index);
        });
    };

    return (
        <tr {...props}>
            <td className={formStyle.file_name}>{props.fileName}</td>
            <td className={formStyle.select_format}>
                <small>to</small>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </td>
            <td className={`${formStyle.status} ${formStyle[props.status]}`}>
                <span>{props.status}</span>
            </td>
            <td className={formStyle.file_size}>{props.fileSize}</td>
            <td>
                <button onClick={() => handleSetFile()} className={formStyle.delete_btn}>
                    <FaXmark />
                </button>
            </td>
        </tr>
    );
};

export default function Form() {
    const [files, setFiles] = useState<File[]>([]);

    const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
            e.target.value = '';
        }
    };

    return (
        <div className={formStyle.container}>
            <h1 className={formStyle.title}>File Converter</h1>
            <p>Convert your files to specific formats</p>
            <table className={formStyle.table}>
                <tbody>
                    {files.map((file, index) => (
                        <FileItem
                            setFiles={setFiles}
                            index={index}
                            key={index}
                            fileName={file.name}
                            fileSize={formatFileSize(file.size)}
                            status={'ready'}
                        />
                    ))}
                </tbody>
            </table>
            <div className={formStyle.form_container}>
                <Image
                    src="/transparent.jpg"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className={formStyle.transparent_background}
                    alt="transparent-background"
                />
                <div className={formStyle.form_overlay}>
                    <form>
                        <div className={formStyle.form_container_group}>
                            <label className={formStyle.add_file_btn}>
                                <input
                                    onChange={(e) => handleFiles(e)}
                                    type="file"
                                    name="files"
                                    accept={FILE_INPUT_ACCESS}
                                    multiple
                                    className="hidden"
                                />
                                <FaPlus className="text-lg" />
                                <span>Add Files</span>
                            </label>
                            <button className={formStyle.convert_btn}>
                                <span>Convert</span>
                                <FaArrowRight className="text-lg" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
