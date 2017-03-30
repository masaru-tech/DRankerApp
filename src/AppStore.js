import {extendObservable, observable, action, computed} from 'mobx';

export default class AppStore {
  constructor(initialStore) {
    extendObservable(this, {
      selectSakes: [], // ArrayっぽいがArrayにあらず
      get submitBtnDisabled() {
        return this.selectSakes.length == 0
      },

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
