import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import {
  AccordionModule,
  ToastModule,
  DropdownModule,
  CarouselModule,
  MenuModule,
  TabMenuModule,
  FullCalendarModule,
  RatingModule,
  TableModule,
  TabViewModule,
  AutoCompleteModule,
  InputTextModule,
  InputTextareaModule,
  PaginatorModule,
  ButtonModule,
  DialogModule,
  ConfirmDialogModule,
  ProgressSpinnerModule,
  CheckboxModule,
  OverlayPanelModule,
  CalendarModule,
  ChartModule,
  EditorModule,
  InputSwitchModule,
  CardModule,
  MultiSelectModule
} from '@app/components/public_api';
import { MessagesModule } from '@app/components/public_api';
import { MessageModule } from '@app/components/public_api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { MessageService } from './api/messageservice';

@NgModule({
  declarations: [],
  imports: [ButtonModule,FormsModule,CommonModule, HttpClientModule],
  exports: [
   // FormsModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    AutoCompleteModule,
    DropdownModule,
    TableModule,
    CheckboxModule,
    CarouselModule,
    CalendarModule,
    InputTextModule,
    PaginatorModule,
    AccordionModule,
    OverlayPanelModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    FullCalendarModule,
    TabViewModule,
    RatingModule,
    MenuModule,
    TabMenuModule,
    ChartModule,
    EditorModule,
    InputSwitchModule,
    DialogModule,
    CardModule,
    MultiSelectModule,
  ],
  providers: [],
})
export class SharedServiceModule {}
