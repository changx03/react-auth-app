type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export default function http(url: string, method: Method, body: Object): Promise<any> {
  return fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
