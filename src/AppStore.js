import {extendObservable, observable, action, computed} from 'mobx';

export default class AppStore {
  constructor(initialStore) {
    extendObservable(this, {
      selectSakes: [],
      selectedPlace: [],
      get submitBtnDisabled() {
        return this.selectSakes.length == 0
      },

      pushSelectSake: action((sake) => {
                      this.selectSakes.push({id: sake.id, name: sake.name});
      }),
      initCheckIn: action(() => {
                      this.selectSakes.clear();
                      this.selectedPlace.clear();
      }),
      selectPlace: action((place) => {
                      this.selectedPlace.push(place);
      })
    });

    this.token = initialStore.token;
  }
}
