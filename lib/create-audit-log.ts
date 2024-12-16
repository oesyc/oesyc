
import {ACTION, ENTITY_TYPE} from "@prisma/client";
import { db } from "./db";
import { getSession } from "./session";
import { redirect } from "next/navigation";



interface Props{
    entityId: string;
    entityType: ENTITY_TYPE;
    entityTitle: string;
    action: ACTION;

};

export const createAuditLog = async (props: Props) =>{
    try {
        const session = await getSession();
    if (!session) {
        // Handle case where there's no session (user not logged in)
        redirect('/login');
      }
      const {userId, orgId, userName}= session;
        if(!userId || !orgId){
            throw new Error(" user not found ");
        }

        const { entityId, entityTitle, entityType, action} = props;
        await db.auditLog.create({
            data:{
                orgId: orgId as string,
                entityId,
                entityType,
                entityTitle,
                action,
                userId: userId,
                userImage: '',
                userName: userName,
            }
        });
    } catch (error) {
        console.log("[AUDIT_LOG_ERROR]", error);
    }
}