import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCsvFile(e.target.files[0]);
            setErrorMessage(null);
            setSuccessMessage(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!csvFile) {
            setErrorMessage("Please select a CSV file.");
            return;
        }

        const formData = new FormData();
        formData.append('csv', csvFile);

        try {
            setUploading(true);
            setErrorMessage(null);
            setSuccessMessage(null);

            const response = await axios.post('/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccessMessage(response.data.message || 'CSV uploaded successfully!');
            setCsvFile(null);
        } catch (error: any) {
            console.error('Upload failed:', error);

            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Upload failed. Please try again.");
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <Head title="Upload CSV" />

            <div className="py-12 bg-gray-300 min-h-screen">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md sm:rounded-lg p-6 text-gray-900 space-y-4">
                        <h2 className="text-xl font-bold">Upload CSV File</h2>

                        {errorMessage && (
                            <div className="p-3 rounded bg-red-100 text-red-700 border border-red-300">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="p-3 rounded bg-green-100 text-green-700 border border-green-300">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Choose CSV File
                                </label>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={uploading}
                                className={`inline-flex items-center px-4 py-2 ${
                                    uploading ? 'bg-gray-400' : 'bg-neutral-600 hover:bg-neutral-700'
                                } border border-transparent rounded-md font-semibold text-white focus:outline-none focus:ring-2 focus:ring-neutral-500`}
                            >
                                {uploading ? 'Uploading...' : 'Upload CSV'}
                            </button>
                        </form>

                        <div className="">
                            <Link href='/csv-users' className='text-blue-600 underline'>See uploaded users</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
