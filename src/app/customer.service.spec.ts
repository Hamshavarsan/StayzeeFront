import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP calls
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch customer data', () => {
    const mockCustomer = { id: '1', name: 'Test User' };
    
    service.getCustomer('1').subscribe(customer => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpMock.expectOne('api/customers/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomer);
  });

  it('should update customer data', () => {
    const updatedData = { name: 'Updated Name' };
    const mockResponse = { success: true };
    
    service.updateCustomer('1', updatedData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('api/customers/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedData);
    req.flush(mockResponse);
  });
});
