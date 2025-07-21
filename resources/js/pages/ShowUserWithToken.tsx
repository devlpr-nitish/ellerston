
import { Head } from '@inertiajs/react';


export interface CsvUser {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  token: string;
  created_at: string; 
  updated_at: string; 
}


export default function ShowUserWithToken({ user, error }:{user:CsvUser, error:string}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Head title="Golf Token Viewer" />
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-black">User Token Info</h1>
                
                {error && (
                    <p className="text-red-600 font-semibold">{error}</p>
                )}

                {user && (
                    <div className="space-y-2 text-gray-800">
                        <p><strong>First Name:</strong> {user.first_name}</p>
                        <p><strong>Last Name:</strong> {user.last_name}</p>
                        <p><strong>Mobile:</strong> {user.mobile}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Token:</strong> {user.token}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
