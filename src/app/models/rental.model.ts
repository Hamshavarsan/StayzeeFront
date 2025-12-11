export interface Rental {
  id: number;                    // int Id (உன் backend-ல int தான?)
  homeTitle: string;
  homeLocation: string;
  bedrooms: number;
  petFriendly: boolean;
  oneDayPrice: number;
  monthPrice: number;
  photoUrls: string[];
}