import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
 
class CSVHelper {
    
//const csvFilePath = path.resolve(__dirname, 'import_template.csv');

//const data = loadCSV(csvFilePath);


public async  loadCSV(csvFilePath: string): Promise<any[]> {
  const readCSVStream = fs.createReadStream(csvFilePath);

	const parseStream = csvParse({ 
	  from_line: 2,
	  ltrim: true,
	  rtrim: true,
	});
	
	const parseCSV = readCSVStream.pipe(parseStream);

	const lines: any = [];

  parseCSV.on('data', line => {
		lines.push(line);
	});
	
	await new Promise(resolve => {
		parseCSV.on('end', resolve);
  });
	
	return lines;
}
}

export default CSVHelper;
