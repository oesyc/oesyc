import { ACTION, AuditLog} from "@prisma/client";
export const GenerateLogMessage = (log:AuditLog) =>{
    const {action, entityTitle, entityType} = log;
    switch (action){
        case ACTION.CREATE:
        return `. created ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.UPDATE:
        return `. updated ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.DELETE:
        return `. Deleted ${entityType.toLowerCase()} "${entityTitle}"`  ;
        default:
        return `. unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
    };
};