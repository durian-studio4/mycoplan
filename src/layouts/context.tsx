import React from 'react';

export const PermissionContext = React.createContext<
  { id: any; name: any; create: any; read: any; update: any; delete: any }[]
>([]);
