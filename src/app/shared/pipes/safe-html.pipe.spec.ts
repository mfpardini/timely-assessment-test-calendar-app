import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;
  let mockSanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    mockSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    
    pipe = new SafeHtmlPipe(mockSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call sanitizer.bypassSecurityTrustHtml with the provided value', () => {
    const testHtml = '<div>Test HTML</div>';
    
    pipe.transform(testHtml);

    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(testHtml);
  });

  it('should return the result from sanitizer.bypassSecurityTrustHtml', () => {
    const testHtml = '<script>alert("test")</script>';
    const mockResult = { __safeHtml: true };
    
    mockSanitizer.bypassSecurityTrustHtml.and.returnValue(mockResult);

    const result = pipe.transform(testHtml);

    expect(result).toBe(mockResult);
  });

  it('should handle empty string', () => {
    const emptyHtml = '';
    
    pipe.transform(emptyHtml);

    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(emptyHtml);
  });

  it('should handle null value', () => {
    const nullHtml = null as any;
    
    pipe.transform(nullHtml);

    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(nullHtml);
  });

  it('should handle undefined value', () => {
    const undefinedHtml = undefined as any;
    
    pipe.transform(undefinedHtml);

    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(undefinedHtml);
  });

  it('should handle complex HTML content', () => {
    const complexHtml = `
      <div class="container">
        <h1>Title</h1>
        <p>Paragraph with <strong>bold</strong> text</p>
        <img src="image.jpg" alt="test">
      </div>
    `;
    
    pipe.transform(complexHtml);

    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(complexHtml);
  });

  it('should handle HTML with special characters', () => {
    const specialCharsHtml = '<div>Content with &amp; &lt; &gt; entities</div>';
    
    pipe.transform(specialCharsHtml);

    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(specialCharsHtml);
  });
});