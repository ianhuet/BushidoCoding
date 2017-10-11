function Ship(draft,crew) {
  this.draft = draft;
  this.crew = crew;

  this.isWorthIt = function() {
    return (draft - (crew*1.5) > 20);
  }
}
