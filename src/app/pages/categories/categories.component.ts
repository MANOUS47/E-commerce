import Swal from 'sweetalert2';
import { IBrands } from '../../shared/interfaces/ibrands';
import { CategoriesService } from './../../core/services/Categories/categories.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Category } from '../../shared/interfaces/icart';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private readonly brandsService = inject(CategoriesService);

  iCategory: WritableSignal<Category[]> = signal([]);

  ngOnInit(): void {
    this.getCategData();
  }

  getCategData(): void {
    this.brandsService.getAllCateg().subscribe({
      next: (res) => {
        console.log(res.data);
        this.iCategory.set(res.data);
      },
    });
  }
}
