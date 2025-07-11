import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
        <p className="text-muted-foreground">Manage your hotel rooms and availability</p>
      </div>
    </div>
  );
};

export default Header;