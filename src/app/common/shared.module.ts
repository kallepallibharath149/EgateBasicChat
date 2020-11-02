import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';

// import { MessagesModule } from '@app/components/public_api';
// import { MessageModule } from '@app/components/public_api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ProfileWithCommentsComponent } from './profile-with-comments/profile-with-comments.component';
//import { MessageService } from './api/messageservice';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {ListboxModule} from 'primeng/listbox';
import {CarouselModule} from 'primeng/carousel';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {RadioButtonModule} from 'primeng/radiobutton';
import {MultiSelectModule} from 'primeng/multiselect';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import {TabMenuModule} from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import {SidebarModule} from 'primeng/sidebar';


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
    TabViewModule,
    MenuModule,
    TabMenuModule,
    ChartModule,
    InputSwitchModule,
    DialogModule,
    CardModule,
    MultiSelectModule,
    RadioButtonModule,
    ListboxModule,
    TooltipModule,
    SidebarModule
  ],
  providers: [],
})
export class SharedServiceModule {}
