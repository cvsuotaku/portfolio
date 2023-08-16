import { Component } from '@angular/core';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  isFirstLoad: boolean = true;
  isLoading: boolean = false;
  errorMessage = ''; 
  successMessage ='';
  formData: any = {
    fullName: '',
    emailAddress: '',
    message: ''
  };

  constructor(private emailService: EmailService) {}

  startLoading() {
    this.isFirstLoad = false;
    this.isLoading = true;
    this.errorMessage = ''; 
    this.successMessage ='';
    // Simulate loading time (you can replace this with your actual loading logic)
    setTimeout(() => {
      this.sendEmail();
    }, 2000); // Change the time as needed
  }

  sendEmail() {
    const emailObserver = {
      next: (response: any) => {
        if(response.statusCode == 200) {
          this.showSuccess(response);
        } else {
          this.showError(response);
        }
        
      },
      error: (error: any) => {
        this.showError(error);
      }
    };
  
    this.emailService.sendEmail(this.formData).subscribe(emailObserver);
    this.formData = {
      fullName: '',
      emailAddress: '',
      message: ''
    };
  }

  private showError(error:any): void {
    this.isLoading = false;
    console.error('Error sending email', error);
    // Handle errors
    // Show error message
    this.errorMessage = 'Error sending email. Please try again later.';
  }

  private showSuccess(response:any): void {
    this.isLoading = false;
    console.log('Email sent successfully', response);
    // Clear the form or perform other actions as needed
    this.successMessage = 'Email sent successfully';
  }
}
