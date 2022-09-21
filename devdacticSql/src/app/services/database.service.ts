import { Injectable } from '@angular/core';

import { JsonSQLite } from '@capacitor-community/sqlite';
//const {CapacitorSQListe, Device, Storage } = Plugins;
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { Capacitor, Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { CapacitorDataStorageSqlite } from 'capacitor-data-storage-sqlite';
import { HttpClient } from 'selenium-webdriver/http';


const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY  = 'db_name';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  store: any;
  dbName: any;

  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

  async init(){
    const info :string = Capacitor.getPlatform(); //await Device.getInfo(); //ISSUE NOT ANYMORE 19/09/2022
    this.store = CapacitorDataStorageSqlite;
    
    if(info === 'android'){
      try {
        const sqlite = CapacitorSQLite as any;
        await sqlite.requestPermission();
        this.setupDatabase();
      } catch (error) {
        const alert = await this.alertCtrl.create({
          header:'No DB access',
          message: 'This app can\'t work without Database access',
          buttons:['OK']
        });
        await alert.present();
      } 
      } else {
        this.setupDatabase();
    }

  }

  private async setupDatabase(){
    const dbSetupDone :boolean = await this.store.isStoreExists({database:DB_SETUP_KEY});

    if(!dbSetupDone){
      this.downloadDatabase();
    } else {
      this.dbName = DB_SETUP_KEY;
      await CapacitorSQLite.open({database: this.dbName});

    }

  }


  // Potentially build this out to an update logic:
  // Sync your data on every app start and update the device DB
  private downloadDatabase(update = false){

  }

  getProductList(){

  }

  async getProductById(id){

  }

}
