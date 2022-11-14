import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serachnews',
})
export class SerachnewsPipe implements PipeTransform {
  transform(news: any[], word: string): any {
    return news.filter(function (oneNews: any) {
      return oneNews.title.toLowerCase().includes(word.toLowerCase());
    });
  }
}
