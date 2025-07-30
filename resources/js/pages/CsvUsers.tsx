import { Head, Link } from '@inertiajs/react';

export interface CsvUser {
    id?: number;
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    token: string;
    created_at?: string;
    updated_at?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedCsvUsers {
    data: CsvUser[];
    current_page: number;
    per_page?: number;
    total: number;
    last_page: number;
    links?: PaginationLink[];
}

interface Props {
    users: PaginatedCsvUsers;
}

export default function CsvUsers({ users }: Props) {
    const perPage = users.per_page ?? 20; 

    return (    
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <Head title="CSV Users" />
            
            <h1 className="text-2xl font-bold mb-4 text-center text-black">CSV Users</h1>

            <div className="overflow-x-auto bg-white p-4 rounded shadow-md">
                <table className="min-w-full table-auto text-sm text-left border">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">First Name</th>
                            <th className="p-2 border">Last Name</th>
                            <th className="p-2 border">Mobile</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Token</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user, index) => (
                            <tr key={user.token} className="text-black border-t hover:bg-gray-50">
                                <td className="p-2 border">
                                    {(users.current_page - 1) * perPage + index + 1}
                                </td>
                                <td className="p-2 border">{user.first_name}</td>
                                <td className="p-2 border">{user.last_name}</td>
                                <td className="p-2 border">{user.mobile}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border text-blue-600 break-all">
                                    <Link href={`/golf/${user.token}`} className="underline">
                                        {user.token}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {users.links && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {users.links.map((link, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 rounded text-sm ${link.active
                                        ? 'bg-blue-500 text-white'
                                        : link.url
                                            ? 'bg-gray-200 text-black'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                disabled={!link.url}
                                onClick={() => {
                                    if (link.url) window.location.href = link.url;
                                }}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}