import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProServiceService } from '../../core/services/products/pro-service.service';
import { Iproducts } from '../../shared/interfaces/IProducts';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly proServiceService = inject(ProServiceService);

  detailsProducts: Iproducts | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProudct = p.get('id');

        this.proServiceService.getSpecificProducts(idProudct).subscribe({
          next: (res) => {
            this.detailsProducts = res.data;
          },
          error: (err) => {},
        });
      },
    });
  }
}
