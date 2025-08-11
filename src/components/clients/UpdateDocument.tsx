import React, { ChangeEvent } from 'react'
import Button from '../ui/Button'
import Input from '../common/Input'
import { DocumenetResponse } from '../../utils/feature/document/type'
import { useTranslation } from 'react-i18next'
import imageCompression from 'browser-image-compression';
import { fileToBase64 } from '../../utils/feature/utils'
import { useUpdateDocumentMutation } from '../../utils/feature/microfinance/microfinanceApi'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'

interface UpdateDocumentProps {
    updateDocument: DocumenetResponse,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUpdateDocument: any
}

function UpdateDocument({ updateDocument, setUpdateDocument }: UpdateDocumentProps) {
    const { t, i18n } = useTranslation()
    const [update, { isLoading: newLoadDocumentApi }] = useUpdateDocumentMutation()

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner un fichier image.');
            return;
        }

        try {
            const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);

            const dataUrl = await fileToBase64(compressedFile);
            // console.log(dataUrl)
            setUpdateDocument({ ...updateDocument, file_url: dataUrl })

        } catch (err) {
            console.error('Erreur de conversion en Base64 :', err);
            alert('Impossible de lire le fichier.');
        }
    };


    const handleUpdate = async () => {
        try {
            await update({ document: updateDocument, lang: i18n.language }).unwrap()
            toast.success(t("settings.unpdate_success"))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast.error(error.data.message)
        }
    }

    return (
        <div className='h-[350px] overflow-y-auto'>
            <div className=' grid grid-cols-1  gap-4'>
                <div>
                    <label htmlFor="document_number">{t("microfinace.document_number")}</label>
                    <Input value={updateDocument?.document_number} type="text" placeholder={t("microfinace.document_number")} onChange={(e) => setUpdateDocument({ ...updateDocument, document_number: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="document_type">{t("microfinace.document_type")}</label>
                    <Input value={updateDocument?.document_type} type="text" placeholder={t("microfinace.document_type")} onChange={(e) => setUpdateDocument({ ...updateDocument, document_type: e.target.value })} />
                    
                    
                    {/* <select onChange={(e) => setUpdateDocument({ ...updateDocument, document_type: e.target.value })} value={updateDocument?.document_type} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 `} name="" id="">
                        <option value="">Type de document</option>
                        <option value="CNI">CNI</option>
                        <option value="passeport">Passeport</option>
                        <option value="Récipissé">Récipissé</option>
                        <option value="REGISTRE_DE_COMMERCE">REGISTRE DE COMMERCE</option>
                    </select> */}
                </div>

                {/* Photo avant */}
                <div  >
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        {t("microfinace.file")}
                    </label>
                    <div className='grid grid-cols-[60%,40%]'>

                        <input
                            id="text"
                            onChange={(e) => handleFileChange(e)}
                            type="file"
                            accept='image/*'
                            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 `}
                        />
                        {
                            updateDocument.file_url &&
                            <img className='w-[120px] h-[120px]' src={updateDocument.file_url} alt="image" />
                        }
                    </div>

                </div>

            </div>
            <div className=' w-full flex justify-end items-end p-2' >
                <Button className='mt-5' variant='primary' onClick={handleUpdate}>
                    {newLoadDocumentApi ? <Loader className='animate-spin' /> : t("microfinace.save")}
                </Button>
            </div>

        </div>
    )
}

export default UpdateDocument
