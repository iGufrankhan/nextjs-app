import React from 'react';

export default async function ProfilePage({ params }: any) {
  // Next.js may pass `params` as a Promise in server components.
  const resolvedParams = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">Profile page {resolvedParams?.id}</p>
    </div>
  );
}
