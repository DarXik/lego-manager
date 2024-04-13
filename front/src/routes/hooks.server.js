export async function handle({event, resolve}){
    event.locals.session = event.cookies.get('session')

    return resolve(event)
}