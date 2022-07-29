export function hasFindResult(id: number | undefined | null) {
    if (typeof id !== 'number')
        throw new Error('The given id does not exist in the database');
    else return;
}
