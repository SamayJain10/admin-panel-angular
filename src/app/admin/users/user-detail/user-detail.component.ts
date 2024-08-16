import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    // Fetch the 'id' parameter from the route
    const userId: string | null = this.route.snapshot.paramMap.get('id');
    
    // Check if userId is not null before using it
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(user => this.user = user);
    } else {
      // Handle the case where userId is null (optional)
      console.error('User ID is null');
    }
  }
}
