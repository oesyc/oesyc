import { promise, z } from "zod";

export type FieldErros<T> = {
    [k in keyof T]?: string[];

};
export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErros<TInput>;
    error?: string | null;
    data?: TOutput;
};

export const CreateSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>>=>{
        const validationResults = schema.safeParse(data);
        if(!validationResults.success) {
            return {
                fieldErrors: validationResults.error.flatten().fieldErrors as FieldErros<TInput>
            };
        }

        return handler(validationResults.data);
    };
};
