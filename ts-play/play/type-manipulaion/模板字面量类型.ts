export function a() {
  type EmailLocaleIDs = 'welcome_email' | 'email_heading'
  type FooterLocaleIDs = 'footer_title' | 'footer_sendoff'

  type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`
}

function b() {
  type PropEventSource<Type> = {
    on<K extends string & keyof Type>(
      eventName: `${K}Changed`,
      callback: (newValue: Type[K]) => void
    ): void
  }

  /// Create a "watched object" with an 'on' method
  /// so that you can watch for changes to properties.
  function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type> {
    throw 'Not impl'
  }

  const person = makeWatchedObject({
    firstName: 'Saoirse',
    lastName: 'Ronan',
    age: 26,
  })

  // makeWatchedObject has added `on` to the anonymous Object

  person.on('ageChanged', (newValue) => {})
}
