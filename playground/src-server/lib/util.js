export function createSubscriber(tag) {
    return {
        next: item => console.log(`${tag}.next ${item}`),
        error: error => console.error(`${tag}.error ${error}`),
        complete: () => console.log(`${tag}.completed`),
    }
}