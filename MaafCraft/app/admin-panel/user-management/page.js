"use client"
import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Name", "Email", "Phone", "Address", "Password", "created_at"];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    email: "Manager@maafcraft.com",
    phone: "0162525252",
    address: "Dhaka Bangladesh",
    password: "XXXXXXXXXXXX",
    created_at: "18/03/24",
  },
 
  {
    name: "John Michael",
    email: "Manager@maafcraft.com",
    phone: "0162525252",
    address: "Dhaka Bangladesh",
    password: "XXXXXXXXXXXX",
    created_at: "18/03/24",
  },
 
  {
    name: "John Michael",
    email: "Manager@maafcraft.com",
    phone: "0162525252",
    address: "Dhaka Bangladesh",
    password: "XXXXXXXXXXXX",
    created_at: "18/03/24",
  },
 
  {
    name: "John Michael",
    email: "Manager@maafcraft.com",
    phone: "0162525252",
    address: "Dhaka Bangladesh",
    password: "XXXXXXXXXXXX",
    created_at: "18/03/24",
  },
 
  {
    name: "John Michael",
    email: "Manager@maafcraft.com",
    phone: "0162525252",
    address: "Dhaka Bangladesh",
    password: "XXXXXXXXXXXX",
    created_at: "18/03/24",
  },
 
  {
    name: "John Michael",
    email: "Manager@maafcraft.com",
    phone: "0162525252",
    address: "Dhaka Bangladesh",
    password: "XXXXXXXXXXXX",
    created_at: "18/03/24",
  },
 
 
];
 
const UserManagement = () => {
  return (
    <Card className="h-full w-[100%] ">
       <h1 className="text-xl w-full text-center my-4 uppercase font-bold mb-8">
                User Management
            </h1>
      <table className="w-[100%]  text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, email, phone, address, password, created_at }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {phone}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {address}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {password}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  {created_at}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default UserManagement;