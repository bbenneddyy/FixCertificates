import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Regis = {
id        :String 
education :String
title     :String
firstname :String
lastname  :String
email     :String 
phone     :String
reason    :String
status    :String 
}

export default function Page( { data: regis }: { data: Regis }) {
  return (
    <div>
        {Array(regis).map((reg, index) => (
            <div key={index}>
                <p>ID: {reg.id}</p>
                <p>Education: {reg.education}</p>
                <p>Title: {reg.title}</p>
                <p>First Name: {reg.firstname}</p>
                <p>Last Name: {reg.lastname}</p>
                <p>Email: {reg.email}</p>
                <p>Phone: {reg.phone}</p>
                <p>Reason: {reg.reason}</p>
                <p>Status: {reg.status}</p>
            </div>
        ))}
    </div>
  );
}

Page.getInitialProps = async () => {
  const regis = await prisma.registration.findMany();
  return { regis };
};