import {extendObservable, observable, action} from 'mobx';

export default class AppStore {
  constructor(initialStore) {
    extendObservable(this, {
      selectSakes: [], // ArrayっぽいがArrayにあらず

      pushSelectSake: action((sake) => {
                      this.selectSakes.push({id: sake.id, name: sake.name});
      }),
      clearSelectSakes: action(() => {
                      this.selectSakes.clear();
      })
    });

    this.token = initialStore.token;
  }
}
