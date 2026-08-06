import AdminLayout from "../layouts/AdminLayout"

const Skeleton_Loading = () => {
    return (
        <AdminLayout>
            <div className="animate-pulse space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-4 w-32 rounded bg-slate-200"></div>
                        <div className="mt-3 h-8 w-64 rounded bg-slate-200"></div>
                    </div>

                    <div className="flex gap-3">
                        <div className="h-10 w-24 rounded-lg bg-slate-200"></div>
                        <div className="h-10 w-36 rounded-lg bg-slate-200"></div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">

                    <div className="flex items-center gap-6 border-b border-slate-200 pb-8">

                        {/* Avatar */}
                        <div className="h-28 w-28 rounded-full bg-slate-200"></div>

                        {/* Name */}
                        <div className="space-y-3">
                            <div className="h-8 w-60 rounded bg-slate-200"></div>
                            <div className="h-5 w-40 rounded bg-slate-200"></div>
                            <div className="h-8 w-24 rounded-full bg-slate-200"></div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="mt-8 grid grid-cols-2 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index}>
                                <div className="mb-2 h-4 w-24 rounded bg-slate-200"></div>
                                <div className="h-6 w-44 rounded bg-slate-200"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Documents */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 h-6 w-40 rounded bg-slate-200"></div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-slate-200 p-5"
                            >
                                <div className="h-12 w-12 rounded bg-slate-200"></div>
                                <div className="mt-4 h-5 w-36 rounded bg-slate-200"></div>
                                <div className="mt-2 h-4 w-28 rounded bg-slate-200"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="h-6 w-40 rounded bg-slate-200"></div>
                    <div className="mt-3 h-4 w-72 rounded bg-slate-200"></div>
                    <div className="mt-6 h-10 w-40 rounded bg-slate-200"></div>
                </div>

            </div>
        </AdminLayout>
    )
}
export default Skeleton_Loading