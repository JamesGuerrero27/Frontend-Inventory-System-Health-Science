/* BASE ROUTES */
export class IntegrationURIS {

	public baseUrl: string;
	public integrationUris: any;

	constructor() {
		this.baseUrl = 'https://sistema20190205065709.azurewebsites.net/api';
		this.integrationUris = {
			'base': this.baseUrl,
			'products': '/Products',
			'typeProducts': '/TypeProducts',
			'productBrands': '/ProductBrands',
			'productStorages': '/Storages',
			'providers': '/Providers',
		}
	}
}