export type DOMMessage = {
    type: 'GET_DOM'
  }
  
  export type DOMMessageResponse = {
    topic: string;
    content: string;
  }