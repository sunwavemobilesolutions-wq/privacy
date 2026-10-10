// Set availableInAppStore to true only after verifying public App Store availability.
// Publishing a What's New page alone must never enable the update prompt.
// Missing entries and false values fail closed. This is an editorial gate, not a store lookup.
window.releaseAvailability = Object.freeze({
  '1.1.9': Object.freeze({availableInAppStore: true})
});
