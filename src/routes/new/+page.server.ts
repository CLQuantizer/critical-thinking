export const load = async ({ locals, parent }) => {
    const {hypotheses} = await parent()
    return {hypotheses};
}