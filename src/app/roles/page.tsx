'use client';

import { useState } from 'react';

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'User', permissions: ['read'] },
  ]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Role Management</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id} className="mb-2 text-black">
            {role.name}: {role.permissions.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}