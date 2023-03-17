import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {getPaginatedResult, getPaginationHeaders} from "./paginationHelper";
import {Message} from "../_models/Message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container); // Container is a query string parameter
    return getPaginatedResult<Message[]>(this.baseUrl + 'messages', params, this.http);
  }
}