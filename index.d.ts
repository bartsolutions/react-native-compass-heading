declare module 'react-native-compass-heading' {
  export const start: (
    threshold: number,
    callback: ({ heading: number, accuracy: number }) => void
  ) => () => void;;
}
