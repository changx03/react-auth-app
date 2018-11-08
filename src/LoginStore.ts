import { action, observable } from 'mobx'

export default class LoginStore {
  private static _instance: LoginStore

  @observable username = ''
  @observable password = ''
  @observable email = ''
  @observable firstname = ''
  @observable lastname = ''

  @action
  setValue(editItem: string, value) {
    this[editItem] = value
  }

  static get instance(): LoginStore {
    return this._instance || (this._instance = new LoginStore())
  }
}
