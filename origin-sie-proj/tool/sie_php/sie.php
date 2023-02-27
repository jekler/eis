<?php

/**
 * sie.php
 *
 * Copyright (c) 2008-2010 revulo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @package     sie
 * @author      revulo <revulon@gmail.com>
 * @copyright   2008-2010 revulo
 * @license     http://www.opensource.org/licenses/mit-license.php  MIT License
 * @version     Release: 0.4
 * @link        http://www.revulo.com/SVG/SIE.html
 * @link        http://sie.sourceforge.jp/
 */

// Filename of SIE JavaScript library.
define('SIE_JS', 'sie.js');

// Get the requested URL.
$url = $_SERVER['REQUEST_URI'];

// Trim the query string from the URL.
$pos = strrpos($url, '?');
if ($pos !== false) {
    $url = substr($url, 0, $pos);
}

// Get the path to the requested file.
$file = rawurldecode($_SERVER['DOCUMENT_ROOT'] . $url);

// Check the file extension.
$extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
if ($extension !== 'svg' && $extension !== 'svgz') {
    header('HTTP/1.1 403 Forbidden');
    exit;
}

// Return a 404 status code if the SVG file is not found.
if (is_readable($file) === false) {
    header('HTTP/1.1 404 Not Found');
    exit;
}

// If the request is an Ajax request, output the raw contents.
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    header('Content-Disposition: inline');
    header('Content-Length: ' . filesize($file));
    header('Content-Type: image/svg+xml');
    readfile($file);
    exit;
}

// If the requested URL contains a question mark, download the file.
if ($pos !== false) {
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    exit;
}

// Get the relative-path reference to the requested file.
$url = basename($url);

// Decode the file name.
$name = rawurldecode($url);
$name = mb_convert_encoding($name, 'UTF-8', 'auto');
$name = htmlspecialchars($name);

// Get uncompressed file contents.
if ($extension === 'svgz') {
    $data = file_get_contents('compress.zlib://' . $file); 
} else {
    $data = file_get_contents($file);
}

// Strip <script> tags from the file contents.
$data = preg_replace('/<script.*?\/script>/is', '', $data);

// Get the absolute-path reference to the JavaScript file.
$javascript = dirname($_SERVER['SCRIPT_NAME']) . '/' . SIE_JS;

// Disable browser caching.
header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>

<div style="color: #777; margin-bottom: 1em;">
This is an image converted by <a href="http://sie.sourceforge.jp/">SIE</a>.<br />
Original file: <a href="<?php echo $url ?>?" title="Download <?php echo $name ?>"><?php echo $name ?></a>
</div>

<script type="image/svg+xml" width="1000" height="1000">
<?php echo $data ?>
</script>
<script type="text/javascript" src="<?php echo $javascript ?>"></script>

</body>
</html>
